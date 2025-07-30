const petForm = document.getElementById("petForm");
const petList = document.getElementById("petList");

petForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("petName").value;
  const newPetRef = window.firebasePush(window.firebaseRef(window.firebaseDB, "pets"));
  await window.firebaseSet(newPetRef, { name });
  petForm.reset();
});

function loadPets() {
  const petsRef = window.firebaseRef(window.firebaseDB, "pets");
  window.firebaseOnValue(petsRef, (snapshot) => {
    petList.innerHTML = "";
    const pets = snapshot.val();
    for (const id in pets) {
      const li = document.createElement("li");
      li.textContent = pets[id].name;
      petList.appendChild(li);
    }
  });
}

loadPets();
