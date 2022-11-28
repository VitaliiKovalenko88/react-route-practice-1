import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  
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
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map(({ id, first, last, favorite }) => {
              return (
                <li key={id}>
                  <NavLink to={`contacts/${id}`} className={({ isActive, isPending }) => isActive
                    ? "active"
                    : isPending
                      ? "pending"
                      : ""} >{
                    first || last
                    ?
                    (<>
                        {first} {last}
                      </>
                    )
                    :
                    (<i>No Name</i>)
                  }
                    {" "} {favorite && <span>★</span>}
                  </NavLink>
                </li>
              )
            })}
          </ul>) : (<p>
            <i>No Contacts</i></p>
          )}
        </nav>
      </div>
      <div id="detail"
           className={
        navigation.state === "loading" ? "loading" : ""
      }>
        <Outlet/>
      </div>
    </>
  );
}