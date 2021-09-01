
//Class de l'objetContact
class Contact {
    /**
     * Class Contact - Cette classe permet d'instancier un objet Contact
     *
     * @param {string} firstName - la valeur de l'attribut firstName
     * @param {string} lastName - la valeur de l'attribut lastName
     * @param {string, number} address - la valeur de l'attribut address
     * @param {string} city - la valeur de l'attribut city
     * @param {string} email  - la valeur de l'attribut email
     */
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
  }