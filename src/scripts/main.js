import { getPosts, registerUser, loginUser, getUsers, createPost, getSinglePost, updatePost, logoutUser, setLoggedInUser, getLoggedInUser } from "./data/DataManager.js"
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";
import { deletePost } from "./data/DataManager.js";
import { PostEdit } from "./feed/PostEdit.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
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

const filterPostList=()=>{
	const postElement = document.querySelector(".postList");
	getPosts().then((allPost)=> {
		const loggedInPost=allPost.filter((singlePost)=>{if(getLoggedInUser().id===singlePost.userId){
			return singlePost
		}
	})
		postElement.innerHTML=PostList(loggedInPost)
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
		  userId: getLoggedInUser().id,
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
			if(response.userId===getLoggedInUser().id){
		  showEdit(response);}
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


  document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "newPost__cancel") {
		document.querySelector(".entryForm").innerHTML=PostEntry()
	}
  })


  document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	}
  })

  const checkForUser = () => {
	if (sessionStorage.getItem("user")){
	  setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
	  startGiffyGram();
	}else {
	 showLoginRegister()
	  console.log("showLogin")
	}
  }



const showLoginRegister = () => {
	showNavBar();
	const entryElement = document.querySelector(".entryForm");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
}

checkForUser()

document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	  }
	  loginUser(userObject)
	  .then(dbUserObj => {
		if(dbUserObj){
		  sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		  startGiffyGram();
		}else {
		  //got a false value - no user
		  const entryElement = document.querySelector(".entryForm");
		  entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		}
	  })
	}
  })


  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	  }
	  registerUser(userObject)
	  .then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		startGiffyGram();
	  })
	}
  })


  document.querySelector(".giffygram").addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	  sessionStorage.clear();
	  checkForUser();
	}
  })

  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("showAll")) {
		showPostList();
	}
  })

  document.querySelector(".giffygram").addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("showMyPosts")) {
		filterPostList();
	}
  })