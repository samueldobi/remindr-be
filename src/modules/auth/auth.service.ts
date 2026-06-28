import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import * as authRepository from "./auth.repository";

const ACCESS_EXPIRY = "15m";
const REFRESH_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: ACCESS_EXPIRY });
}

function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString("hex");
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function register(name: string, email: string, password: string) {
  const existing = await authRepository.findByEmail(email);
  if (existing.rows[0]) throw new Error("Email already in use");

  const password_hash = await bcrypt.hash(password, 10);
  const { rows } = await authRepository.createUser({ name, email, password_hash });
  const user = rows[0];
  if (!user) throw new Error("Failed to create user");

  const accessToken = signAccessToken(user.id);
  const refreshToken = generateRefreshToken();
  await authRepository.createRefreshToken(user.id, hashToken(refreshToken), new Date(Date.now() + REFRESH_EXPIRY_MS));

  return { accessToken, refreshToken, user };
}

export async function login(email: string, password: string) {
  const { rows } = await authRepository.findByEmail(email);
  const user = rows[0];
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid email or password");

  const accessToken = signAccessToken(user.id);
  const refreshToken = generateRefreshToken();
  await authRepository.createRefreshToken(user.id, hashToken(refreshToken), new Date(Date.now() + REFRESH_EXPIRY_MS));

  return { accessToken, refreshToken, user };
}

export async function refresh(refreshToken: string) {
  const { rows } = await authRepository.findRefreshToken(hashToken(refreshToken));
  const stored = rows[0];
  if (!stored) throw new Error("Invalid or expired refresh token");

  await authRepository.deleteRefreshToken(stored.token_hash);

  const accessToken = signAccessToken(stored.user_id);
  const newRefreshToken = generateRefreshToken();
  await authRepository.createRefreshToken(stored.user_id, hashToken(newRefreshToken), new Date(Date.now() + REFRESH_EXPIRY_MS));

  return { accessToken, refreshToken: newRefreshToken };
}

export async function logout(refreshToken: string) {
  await authRepository.deleteRefreshToken(hashToken(refreshToken));
}
