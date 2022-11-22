/* eslint-disable no-restricted-globals */
import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "contacts";

export async function loader({ params }) {
  return getContact(params.contactId);
}

export default function Contact() {

  const {contact} = useLoaderData();

  const contacts = {
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div id="contact">
      <div>
        <img
          key={contacts.avatar}
          src={contacts.avatar || null}
          alt=""
        />
      </div>

      <div>
        <h1>
          {contacts.first || contacts.last ? (
            <>
              {contacts.first} {contacts.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contacts} />
        </h1>

        {contacts.twitter && (
          <p>
            <a
              target="blank"
              href={`https://twitter.com/${contacts.twitter}`}
            >
              {contacts.twitter}
            </a>
          </p>
        )}

        {contacts.notes && <p>{contacts.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
 
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}