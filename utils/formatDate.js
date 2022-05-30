const formatDate = date => {
  const options = {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  };

  return new Date(date).toLocaleDateString('ES-pe', options);
};

export default formatDate;
