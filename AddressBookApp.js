// UC1 - Creating the contact class
// UC2 - Validation added in class

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        if (!this.validateName(firstName)) throw new Error("Invalid First Name!");
        if (!this.validateName(lastName)) throw new Error("Invalid Last Name!");
        if (!this.validateAddress(address)) throw new Error("Invalid Address!");
        if (!this.validateAddress(city)) throw new Error("Invalid City!");
        if (!this.validateAddress(state)) throw new Error("Invalid State!");
        if (!this.validateZip(zip)) throw new Error("Invalid Zip Code!");
        if (!this.validatePhone(phoneNumber)) throw new Error("Invalid Phone Number!");
        if (!this.validateEmail(email)) throw new Error("Invalid Email!");

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNumber}, ${this.email}`;
    }

    // Starts with uppercase, min 3 chars
    validateName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    // for min 4 chars, only letters & spaces
    validateAddress(value) {
        return /^[A-Za-z\s]{4,}$/.test(value);
    }

    // For 5 or 6 digit zip code
    validateZip(zip) {
        return /^\d{5,6}$/.test(zip);
    }

    // For 10-digit phone number
    validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    // For standard email pattern
    validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
}

// UC3 - Creating the address book class and adding the contact to it
class AddressBook {
    constructor() {
        this.contacts = [];
    }

    // UC7 - Ensuring no duplicate contact is being added
    addContact(contact) {
        let isDuplicate = this.contacts.filter(c => c.firstName === contact.firstName && c.lastName === contact.lastName).length > 0;

        if(isDuplicate) {
            console.log("Contact already exists in the address book.");
            return;
        }
        
        this.contacts.push(contact);
        console.log("Contact added successfully...");
    }

    displayContact() {
        if(this.contacts.length === 0) {
            console.log("Contacts is empty...");
            return;
        }

        console.log("\nAddress book contacts are: ");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1} : ${contact.toString()}`);
        });
    }

    // UC4 - Abitilty to find contact based on name and edit it as well
    findContact(name) {
        let contact = this.contacts.find(c => c.firstName.toLowerCase() === name.toLowerCase());
        if (contact) {
            console.log(`\nContact found: ${contact.toString()}`);
            return contact;
        } else {
            console.log("Contact not found!");
            return null;
        }
    }

    editContact(name, field, newValue) {
        let contact = this.findContact(name);
        if (!contact) return;

        try {
            switch (field.toLowerCase()) {
                case "firstname":
                    if (!contact.validateName(newValue)) throw new Error("Invalid First Name!");
                    contact.firstName = newValue;
                    break;
                case "lastname":
                    if (!contact.validateName(newValue)) throw new Error("Invalid Last Name!");
                    contact.lastName = newValue;
                    break;
                case "address":
                    if (!contact.validateAddress(newValue)) throw new Error("Invalid Address!");
                    contact.address = newValue;
                    break;
                case "city":
                    if (!contact.validateAddress(newValue)) throw new Error("Invalid City!");
                    contact.city = newValue;
                    break;
                case "state":
                    if (!contact.validateAddress(newValue)) throw new Error("Invalid State!");
                    contact.state = newValue;
                    break;
                case "zip":
                    if (!contact.validateZip(newValue)) throw new Error("Invalid Zip Code!");
                    contact.zip = newValue;
                    break;
                case "phonenumber":
                    if (!contact.validatePhone(newValue)) throw new Error("Invalid Phone Number!");
                    contact.phoneNumber = newValue;
                    break;
                case "email":
                    if (!contact.validateEmail(newValue)) throw new Error("Invalid Email!");
                    contact.email = newValue;
                    break;
                default:
                    console.log("Invalid field name.");
                    return;
            }
                
            console.log("Contact updated successfully.");
        } catch (error) {
            console.error(error.message);
        }
    }

    findAndDelete(firstName, lastName) {
        let index = this.contacts.findIndex(c => c.firstName === firstName && c.lastName === lastName);

        if(index == -1) {
            console.log("Contact does not exists in the contact book!");
            return;
        }

        this.contacts.splice(index, 1);
        console.log("Contact deleted successfully...");
    }

    // UC6 - Getting the number of contacts present
    numberOfContacts() {
        console.log(`\nNumber of contacts in the address book are: ${this.contacts.length}`)
    }

    // UC8 - Checking contact by address & UC9 - view of the contact
    findByAddress(field, name) {
        this.contacts.forEach(c => {
            switch(field) {
                case "city" : if(c.city === name) {
                                console.log(`Contact details are: ${c.toString()}`);
                                break;
                            }
                case "state" : if(c.state === name) {
                                console.log(`Contact details are: ${c.toString()}`);
                                break;
                            }
                default : console.log('Not a valid address field for searching..');
                            return;
            }
        })
    }

    // UC10 - Getting the number of contacts by address (city or state)
    countContactByAddress(field, name) {
        var numberOfContact = 0;

        this.contacts.forEach(c => {
            switch(field) {
                case "city" : if(c.city === name) 
                                numberOfContact++;
                                break;
                case "state" : if(c.state === name) 
                                numberOfContact++;
                                break;
                default : console.log('Not a valid address field for searching..');
                            return;
            }
        })

        console.log(`Number of contact present for given address is: ${numberOfContact}`);
    }

    // UC11 - Sort the contact alphabetically by name
    sortByName() {
        this.contacts.sort((a, b) => {
            let nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
            let nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
            return nameA.localeCompare(nameB); // Compare names alphabetically
        });
    
        console.log("Sorted Address Book:");
        console.log(this.contacts.map(contact => contact.toString()).join("\n"));    
    } 

    // UC12 - Sort by city, state or zip
    sortByProperty(property) {
        this.contacts.sort((a, b) => a[property].localeCompare(b[property]));

        console.log(`Sorted Address book by ${property} : \n`);
        console.log(this.contacts.map(contact => contact.toString()).join("\n"));
    }
}

let addressBook = new AddressBook();
var contact1 = new  Contact("Shivam", "Kumar", "Bhopal", "Ananad nagar", "Madhya Pradesh", 462022, 1234567899, "sahil@gmail.com");
addressBook.addContact(contact1);

addressBook.displayContact();
addressBook.findContact("Shivam");

addressBook.editContact("Shivam", "state", "Bihar");
addressBook.displayContact();

addressBook.numberOfContacts();
addressBook.findByAddress("state", "Bihar");
addressBook.countContactByAddress("city", "Bhopal");
addressBook.sortByProperty("state");