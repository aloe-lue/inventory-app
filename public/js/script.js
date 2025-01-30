const dialog = document.querySelector(".dialogCreateGuitarTypeForm");
const btnDialogOpener = document.querySelector(".buttonCreateGuitarButtonShow");
const btnDialogerCloser = document.querySelector(
  ".buttonCreateGuitarButtonClose"
);

function openDialog(dialog, element, input) {
  const guitarIdUpdate = document.querySelector(input);
  guitarIdUpdate.value = element;
  dialog.showModal();
}

function openDialogCreate(dialog) {
  dialog.showModal();
}
function closeDialog(dialog) {
  dialog.close();
}

btnDialogOpener.addEventListener("click", () => openDialogCreate(dialog));
btnDialogerCloser.addEventListener("click", () => closeDialog(dialog));

const dialogUpdate = document.querySelector(".dialogUpdateGuitarType");
const btnDialogOpenerUpdate = document.querySelectorAll(
  ".updateGuitarTypeShow"
);
const btnDialogCloseUpdate = document.querySelector(
  ".buttonGuitarUpdateButtonClose"
);

btnDialogOpenerUpdate.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    openDialog(dialogUpdate, e.target.id, "#updateGuitarTypeId");
  });
});

btnDialogCloseUpdate.addEventListener("click", () => closeDialog(dialogUpdate));

const dialogDelete = document.querySelector(".dialogDeleteGuitarType");
const btnDialogOpenerDelete = document.querySelectorAll(
  ".deleteGuitarTypeShow"
);
const btnDialogCloseDelete = document.querySelector(
  ".buttonGuitarDeleteButtonClose"
);

btnDialogOpenerDelete.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    openDialog(dialogDelete, e.target.id, "#deleteGuitarTypeId");
  });
});

btnDialogCloseDelete.addEventListener("click", () => closeDialog(dialogDelete));
