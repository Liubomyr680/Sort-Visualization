document.getElementById("loginButton").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginDto = { username: username, password: password };

    try {
        const response = await fetch("/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDto)
        });

        if (response.ok) {
            // Якщо аутентифікація успішна, переходимо на сторінку /sort
            window.location.href = "/sort";
        } else {
            // Відображення помилки аутентифікації
            alert("Authentication failed. Please check your username and password.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});