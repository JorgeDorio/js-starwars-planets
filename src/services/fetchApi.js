const fetchApi = async () => {
  const url = 'https://star-api-wars.herokuapp.com/';
  const response = await fetch(url);
  const data = await response.json();
  // const filteredData = data.filter(() => {

  // })
  return data;
};

export default fetchApi;
