const createGuitarItemFormDialog = document.querySelector(
  ".createGuitarItemDialog"
);
const createGuitarItemClose = document.querySelector(
  ".createGuitarItemDialogClose"
);
const createGuitarItemDialogOpen = document.querySelector(
  ".createGuitarItemDialogOpen"
);

function showModalElement(dialog) {
  dialog.showModal();
}

function closeModal(dialog) {
  dialog.close();
}

createGuitarItemDialogOpen.addEventListener("click", () =>
  showModalElement(createGuitarItemFormDialog)
);
createGuitarItemClose.addEventListener("click", () =>
  closeModal(createGuitarItemFormDialog)
);

const updateGuitarItemFormDialog = document.querySelector(
  ".updateGuitarItemDialog"
);
const updateGuitarItemShow = document.querySelectorAll(".update");
const updateGuitarItemClose = document.querySelector(
  ".updateGuitarItemDialogClose"
);

function showModalAction(dialog, id, input, curr, currInput) {
  const INPUT = document.querySelector(input);
  const INPUTCURR = document.querySelector(currInput);
  INPUTCURR.value = curr;
  INPUT.value = id;
  dialog.showModal();
}

updateGuitarItemShow.forEach((updateBtn) => {
  updateBtn.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-id");
    const value = e.target.getAttribute("data-value");
    showModalAction(
      updateGuitarItemFormDialog,
      index,
      "#updateGuitarId",
      value,
      "#currentUpdateGuitarName"
    );
  });
});

updateGuitarItemClose.addEventListener("click", () =>
  closeModal(updateGuitarItemFormDialog)
);

const deleteGuitarItemFormDialog = document.querySelector(
  ".deleteGuitarItemDialog"
);
const deleteGuitarItemShow = document.querySelectorAll(".delete");
const deleteGuitarItemClose = document.querySelector(
  ".deleteGuitarItemDialogClose"
);

deleteGuitarItemShow.forEach((dltBtn) => {
  dltBtn.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-id");
    const value = e.target.getAttribute("data-value");

    showModalAction(
      deleteGuitarItemFormDialog,
      index,
      "#deleteGuitarItemId",
      value,
      "#currentDeleteGuitarName"
    );
  });
});

deleteGuitarItemClose.addEventListener("click", () => {
  closeModal(deleteGuitarItemFormDialog);
});
