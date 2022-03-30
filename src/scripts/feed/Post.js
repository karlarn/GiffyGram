import { getLoggedInUser } from "../data/DataManager.js"

export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
            <div> Posted: ${postObject.timestamp}</div>
            <div> Posted by: ${postObject.user.name} </div>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <h3>${postObject.description}</h3>
        ${postObject.userId===getLoggedInUser().id? `<button id="edit__${postObject.id}">Edit</button>`:``}
        ${postObject.userId===getLoggedInUser().id?`<button id="delete__${postObject.id}">Delete</button>`:``}
      </section>
    `
  }