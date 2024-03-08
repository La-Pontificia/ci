const fetchAllTables = async () => {
  return await fetch('/api/tables', {
    method: 'GET'
  })
    .then(async (response) => await response.json())
    .then((json) => json)
}

const fetchAllFloors = async () => {
  return await fetch('/api/floors', {
    method: 'GET'
  })
    .then(async (response) => await response.json())
    .then((json) => json)
}

const queries = {
  fetchAllTables,
  fetchAllFloors
}

export default queries
