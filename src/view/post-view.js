import { userCurrent } from "../controller-firebase/firebase-authentication.js";
import { editPost, deletePost, addLikePost, deleteLikePost, saveComment, showLikePost } from "../controller/post-controller.js";
import { } from '../controller/post-controller.js';

export const postList = (note) => {
  const liElement = document.createElement('li');
  liElement.classList.add('li-child');
  liElement.innerHTML = `
    <div class="div-post">
  <div class="user-publicated flex-name-post">
    <div class="only-flex">
      <div>
        <p> Publicado por: ${note.username} </p>
        <select id="select-privacy-${note.userID}" class="btn-select" name="select" disabled>
          ${note.privacy === 'privado' ? `<option value="privado" selected>Privado</option>
          <option value="publico">Público</option>` : `<option value="privado">Privado</option>
          <option value="publico" selected>Público</option> `}
        </select>
      </div>
      <p class="date-publication">${note.timePost}</p>
    </div>
    ${userCurrent().uid === note.userID ? `
    <span class="btn-delete" id="delete-${note.userID}"><i class="fas fa-trash-alt"></i></span>` :
      `<span class="hide" id="delete-${note.userID}"><i class="fas fa-trash-alt"></i></span>`}
  </div>
  <div class="middle-post">
    <div class="textarea no-border" id="text-${note.userID}" contentEditable="false">${note.publication}</div>
    ${note.img !== '' ? `<img class="img-post margin" src="${note.img}">` : ''}
  </div>
  <div class="botom-post">
    <div>
      <i class="fa fa-heart-o heart-empty" id="like-${note.userID}" data-post="${note.userID}"></i>
      <i class="fa fa-heart hide heart-full" aria-hidden="true" id="dislike-${note.userID}" data-post="${note.userID}"></i>
      <a id="counter-${note.userID}" class="counter-heart"></a>
    </div>
    <div>
      <span id="show-comment"><i class="far fa-comment"></i></span>
      <a id="comments-counter-${note.userID}" class="counter-heart"></a>
    </div>
    ${userCurrent().uid === note.userID ? ` 
    <span class="margin-left hide" id="save-post-${note.userID}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i
        class="fa fa-floppy-o icon-save"></i></span>
    <span class="margin-left" id="edit-${note.userID}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i
        class="fa fa-pencil-square-o icon-edit"></i></span> ` : ` 
        <span class="margin-left hide" id="save-post-${note.userID}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i class="fa fa-floppy-o icon-save"></i></span>
        <span class="margin-left hide" id="edit-${note.userID}" data-note="${note.publication}" data-privacidad="${note.privacy}"><i class="fa fa-pencil-square-o icon-edit"></i><span>`}
  </div>
  <div id="comments-section" class="hide">
    <form id="form-publication" maxlength=50 class="form-comment" required>
      <textarea placeholder="Escribe tu comentario" id="post-comment-${note.userID}" class="textarea-comment"></textarea>
      <span id="btn-comment-${note.userID}" data-post="${note.userID}" class="margin btn-comment"><i class="far fa-paper-plane"></i></span>
    </form>
    <section id="all-comments-${note.userID}"></section>
  </div>
</div>
    `;

  liElement.querySelector(`#delete-${note.userID}`)
    .addEventListener('click', () => { deletePost(note.userID) });

  liElement.querySelector(`#edit-${note.userID}`)
    .addEventListener('click', () => { editPost(note.userID) });

  liElement.querySelector(`#like-${note.userID}`)
    .addEventListener('click', () => { addLikePost(note.userID) });

  liElement.querySelector(`#dislike-${note.userID}`)
    .addEventListener('click', () => { deleteLikePost(note.userID) });

  liElement.querySelector(`#btn-comment-${note.userID}`)
    .addEventListener('click', () => {
      const postComment = liElemnt.querySelector(`#post-comment-${note.userID}`);
      saveComment(objNote.id);
      postComment.value = '';
    });

  // showLikePost(liElement, note.userID);

  const allComents = liElement.querySelector(`#all-comments-${note.userID}`);
  const showComment = liElement.querySelector('#show-comment');
  const commentSection = liElement.querySelector('#comments-section');
  const counterComment = liElement.querySelector(`#comments-counter-${note.userID}`);
  showComment.addEventListener('click', () => {
    if (commentSection.className === 'hide') {
      commentSection.classList.remove('hide');
    } else {
      commentSection.classList.add('hide');
    }
  });

  // getAllComments(note.userID, (coments) => {
  //   allComents.innerHTML = '';
  //   coments.forEach((comment) => {
  //     allComents.appendChild(listComment(comment));
  //   });
  //   counterComment.innerHTML = coments.length;
  // });

  return liElement;
};