async function getCongresspeople() {
  const response = await fetch(
    'https://api.dev.congreso.openpolitica.com/api/congressperson',
  );
  const data = await response.json();
  const congresspeople = data.data.filter(congressperson =>
    congressperson.position_elected.includes('CONGRESISTA'),
  );
  return congresspeople;
}

export { getCongresspeople };
