let form = db.getSiblingDB("form");

form.createUser(
    {
        user: "form",
        pwd: "example",
        roles: [
            {
                role: "readWrite",
                db: "form"
            }
        ]
    }
);
