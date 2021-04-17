async function ajaxGet(url, method) {
  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    await method(data);
  } catch (error) {
    console.log("error fetch data");
  }
}
