// Firebase setup: copy firebase-config.example.js to firebase-config.js and add your Firebase web config.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig), auth = getAuth(app), db = getFirestore(app);
const modal=document.querySelector("#authModal"), form=document.querySelector("#authForm"), status=document.querySelector("#authStatus");
let mode="register", currentUser=null;
const show=()=>{modal.classList.add("show");modal.setAttribute("aria-hidden","false")};
const hide=()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true");status.textContent=""};
function setMode(next){mode=next;document.querySelector("#authTitle").textContent=next==="register"?"Create your account":"Welcome back";document.querySelector("#fullName").parentElement.style.display=next==="register"?"block":"none";document.querySelector("#authSubmit").textContent=next==="register"?"Register":"Sign in";document.querySelector("#password").autocomplete=next==="register"?"new-password":"current-password";document.querySelector("#switchAuth").textContent=next==="register"?"Sign in":"Create an account";status.textContent=""}
document.querySelector("#openAuth").onclick=()=>{setMode("login");show()};
document.querySelector("#joinTop").onclick=()=>{setMode("register");show()};
document.querySelector("#closeAuth").onclick=hide;
document.querySelector("#switchAuth").onclick=()=>setMode(mode==="register"?"login":"register");
document.querySelector("#menuBtn").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelector("#year").textContent=new Date().getFullYear();
form.addEventListener("submit",async e=>{e.preventDefault();status.textContent="Please wait…";const email=document.querySelector("#email").value.trim(),password=document.querySelector("#password").value;
try{if(mode==="register"){const name=document.querySelector("#fullName").value.trim();const cred=await createUserWithEmailAndPassword(auth,email,password);await setDoc(doc(db,"members",cred.user.uid),{uid:cred.user.uid,fullName:name,email,status:"pending_approval",role:"member",createdAt:serverTimestamp()});status.textContent="Registration received. Your account is pending administrator approval.";}else{await signInWithEmailAndPassword(auth,email,password);status.textContent="Signed in. Access may remain limited until an administrator approves your account.";}}catch(err){status.textContent=err.message.replace("Firebase: ","");}});
onAuthStateChanged(auth,user=>{currentUser=user;if(user){document.querySelector("#openAuth").textContent="Account";document.querySelector("#openAuth").onclick=()=>{setMode("login");show();status.textContent=`Signed in as ${user.email}`}}else{document.querySelector("#openAuth").textContent="Sign in"}});
document.querySelector("#deleteAccount").onclick=async()=>{if(!currentUser){status.textContent="Sign in first to delete your account.";return}if(!confirm("Permanently delete your authentication account? This cannot be undone."))return;try{await deleteUser(currentUser);status.textContent="Authentication account deleted. Contact the administrator if a profile record remains."; }catch(e){status.textContent=e.message+" Sign in again and retry if required."}};
