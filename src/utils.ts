export function makeImagePath(filePath: string, format?: string) {
  return `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }/${filePath}`;
}
