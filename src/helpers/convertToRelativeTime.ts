export const convertToRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const delta = now.getTime() - date.getTime();

  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isSameDay) {
    return "Today";
  }

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));

  if (days === 1) {
    return "1 day ago";
  } else {
    return `${days} days ago`;
  }
};
