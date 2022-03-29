import { getPosts, getUsers, createPost, getSinglePost, updatePost } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { deletePost } from "./data/DataManager.js";
import { PostEdit } from "./feed/PostEdit.js";
/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/


// const startGiffyGram = () => {
//     const postElement = document.querySelector(".postList");
// 	postElement.innerHTML = "Hello Cohort 55"
// }
// // Are you defining the function here or invoking it?
// startGiffyGram()

// getUsers()
// .then(data => {
//     console.log("User Data", data)
// })

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = () => {
    document.querySelector(".footer").innerHTML = Footer()
}
const showPostEntry = () => { 
	//Get a reference to the location on the DOM where the nav will display
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEntry();
  }

const startGiffyGram = () => {
	showPostList();
    showNavBar();
    showFooter();
	showPostEntry()
}

startGiffyGram();

document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

document.querySelector("#yearSelection").addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
  
      console.log(`User wants to see posts since ${yearAsNumber}`)
    }
  })

document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "directMessageIcon"){
		console.log("You clicked on the fountain pen.")
	}
})

document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "Pb"){
		console.log("You clicked on the jar.")
	}
})

document.querySelector(".giffygram").addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("__"))
		console.log("the id is", event.target.id.split("__")[1])
	}
})

document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		//clear the input fields
	}
  })
  
  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "newPost__submit") {
	//collect the input values into an object to post to the DB
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  //we have not created a user yet - for now, we will hard code `1`.
	  //we can add the current time as well
	  const postObject = {
		  title: title,
		  imageURL: url,
		  description: description,
		  userId: 1,
		  timestamp: Date(Date.now())
	  }
		createPost(postObject)
		.then(()=>{
			showPostList()
			document.querySelector("input[name='postTitle']").value=''
	  		document.querySelector("input[name='postURL']").value=''
	  		document.querySelector("textarea[name='postDescription']").value=''
		})

	}
  })

  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
	  const postId = event.target.id.split("__")[1];
	  deletePost(postId)
		.then(response => {
		  showPostList();
		})
	}
  })

  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
	  const postId = event.target.id.split("__")[1];
	  getSinglePost(postId)
		.then(response => {
		  showEdit(response);
		})
	}
  })


  const showEdit = (postObj) => {
	const entryElement = document.querySelector(".entryForm");
	entryElement.innerHTML = PostEdit(postObj);
  }
  


  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
	  const postId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const title = document.querySelector("input[name='postTitle']").value
	  const url = document.querySelector("input[name='postURL']").value
	  const description = document.querySelector("textarea[name='postDescription']").value
	  const timestamp = document.querySelector("input[name='postTime']").value
	  
	  const postObject = {
		title: title,
		imageURL: url,
		description: description,
		userId: 1,
		timestamp: timestamp,
		id: parseInt(postId)
	  }
	  
	  updatePost(postObject)
		.then(response => {
		  showPostList();
		})
	}
  })