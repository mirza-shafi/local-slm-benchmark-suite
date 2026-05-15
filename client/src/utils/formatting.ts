/**
 * Formatting utilities for display.
 */

export const formatLatency = (ms: number): string => {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
};

export const formatMemory = (mb: number): string => {
  if (mb < 1024) {
    return `${Math.round(mb)}MB`;
  }
  return `${(mb / 1024).toFixed(2)}GB`;
};

export const formatThroughput = (tokensPerSec: number): string => {
  return `${tokensPerSec.toFixed(2)} tok/s`;
};

export const formatCost = (dollars: number): string => {
  if (dollars === 0) {
    return "Free (Local)";
  }
  return `$${dollars.toFixed(4)}`;
};

export const formatScore = (score: number): string => {
  return `${(score * 100).toFixed(1)}%`;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const getRankIcon = (rank: number): string => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};
