
const UserList = ({data}) => {
  return data
    ? data.docs.map((doc, index) => (
        <li className="mt-8 w-full flex p-4" key={index}>
          <a className="w-1/12" href={`/user/${doc.data().uid}`}>
            <img
              src={doc.data().photoURL}
              className="rounded-full w-full border-2 border-pink-300"
              alt=""
            />
          </a>
          <div className="ml-5 w-11/12">
            <a href={`/user/${doc.data().uid}`}>
              <p className="text-2xl font-bold">{doc.data().displayName}</p>
            </a>
          </div>
        </li>
      ))
    : '';
}

export default UserList
