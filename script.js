// تخزين البيانات باستخدام LocalStorage
let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

// مراجع للعناصر
const mainMenu = document.getElementById("main-menu");
const formContainer = document.getElementById("form-container");
const resultsContainer = document.getElementById("results-container");
const registerBtn = document.getElementById("register-btn");
const searchLocalBtn = document.getElementById("search-local-btn");
const searchAllBtn = document.getElementById("search-all-btn");
const userForm = document.getElementById("user-form");

// عرض نموذج التسجيل
registerBtn.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    formContainer.classList.remove("hidden");
});

// معالجة تسجيل البيانات
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const governorate = document.getElementById("governorate").value;
    const age = parseInt(document.getElementById("age").value, 10);
    const gender = document.getElementById("gender").value;

    usersData.push({ name, username, governorate, age, gender });
    localStorage.setItem("usersData", JSON.stringify(usersData));

    alert("تم تسجيل المعلومات بنجاح!");
    formContainer.classList.add("hidden");
    mainMenu.classList.remove("hidden");
});

// البحث عن شخص من نفس المحافظة
searchLocalBtn.addEventListener("click", () => {
    const currentUser = usersData[usersData.length - 1];
    if (!currentUser) {
        alert("يرجى تسجيل بياناتك أولاً.");
        return;
    }

    const matches = usersData.filter(
        (user) =>
            user.governorate === currentUser.governorate &&
            user.gender !== currentUser.gender &&
            user.age > currentUser.age
    );

    displayResults(matches);
});

// البحث عن شخص من جميع المحافظات
searchAllBtn.addEventListener("click", () => {
    const currentUser = usersData[usersData.length - 1];
    if (!currentUser) {
        alert("يرجى تسجيل بياناتك أولاً.");
        return;
    }

    const matches = usersData.filter(
        (user) => user.gender !== currentUser.gender && user.age > currentUser.age
    );

    displayResults(matches);
});

// عرض النتائج
function displayResults(matches) {
    resultsContainer.innerHTML = "";
    if (matches.length > 0) {
        matches.forEach((match) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong>الاسم:</strong> ${match.name}<br>
                <strong>اليوزر:</strong> @${match.username}<br>
                <strong>المحافظة:</strong> ${match.governorate}<br>
                <strong>العمر:</strong> ${match.age}<br>
                <strong>الجنس:</strong> ${match.gender === "boy" ? "ولد" : "بنت"}
            `;
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.textContent = "لم يتم العثور على نتائج.";
    }
    resultsContainer.classList.remove("hidden");
}
