// fetch("http://localhost:3000/order", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         item: "Pizza",
//         size: "Large",
//         quantity: 2
//     })
// })
// .then((response) => {
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json(); // Convert the response to JSON only if it's successful
// })
// .then((data) => {
//     console.log("POST Response:", data); // Log the response
// })
// .catch((error) => {
//     console.error("Error with POST request:", error); // Handle errors
// });
// const container = document.querySelector(".container");

// fetch("http://localhost:3000")
//   .then(data => data.text())
//   .then(res => {
//     container.innerHTML = res;  // Set the fetched data as the content of the container
//   })
//   .catch(err => console.error("Error:", err)); // Catch any errors

