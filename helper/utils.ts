export const logResponse = async (response: any) => {
  console.log(`Status: ${response.status()}`);
  
  const responseBody = await response.json(); // Parse the response body as JSON
  console.log(`Response Body: ${JSON.stringify(responseBody, null, 2)}`); // Convert object to JSON string with pretty printing
};
