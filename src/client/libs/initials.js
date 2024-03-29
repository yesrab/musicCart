function initials(string) {
  const words = string.split(" ");
  let initials = "";
  if (words.length >= 1) {
    initials += words[0].charAt(0).toUpperCase();
    if (words.length >= 2) {
      initials += words[1].charAt(0).toUpperCase();
    }
  }
  return initials;
}
export default initials;
