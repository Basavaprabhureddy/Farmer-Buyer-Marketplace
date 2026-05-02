const token = localStorage.getItem("token");

axios.get("http://localhost:8080/api/users", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})