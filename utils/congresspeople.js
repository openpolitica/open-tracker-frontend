async function getCongresspeople() {
  const response = await fetch(
    'https://api.dev.congreso.openpolitica.com/api/congressperson',
  );
  const data = await response.json();
  return data.data;
}

export { getCongresspeople };
