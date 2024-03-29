async function fetchUtils(request) {
  console.log("attempting request");
  try {
    const responce = await fetch(request);
    return await responce.json();
  } catch (error) {
    return error;
  }
}
export default fetchUtils;
