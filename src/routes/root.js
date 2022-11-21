import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>{contacts.map(({ id, first, last, favorite }) => {
              return (
                <li key={id}>
                  <Link to={`contacts/${id}`}>{first || last ? (<>
                    {first} {last} </>) : (<i>No Name</i>)}{" "} {favorite && <span>★</span>}</Link>
                </li>
              )
            })}
          </ul>) : (<p>
            <i>No Contacts</i></p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet/>
      </div>
    </>
  );
}