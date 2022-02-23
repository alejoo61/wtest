import {db} from "./firebase-config";
import {collection, getDocs, addDoc, updateDoc, deleteDoc} from "firebase/firestore";

// READ
const [users, setUsers] = useState([]);
const usersCollectionRef = collection(db, "users");
const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data, id: doc.id })))
    //    console.log(data);
}

// CREATE
const [newName, setNewName] = useState("")
const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName})
}

// UPDATE
const [newName, setNewName] = useState("")
const updateUser = async (id, previous) => {
    // user specific
    const userDoc = doc(db, "users", id);
    const newUpdatedFields = {age: previous + 1}
    await updateDoc(userDoc, newUpdatedFields)
}

// DELETE
const deleteUser = async (id, previous) => {
    // user specific
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
}