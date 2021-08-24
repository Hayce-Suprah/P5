//EcmaScript 6 : POO Class
//Class de l'objetArticle
class Contact {
    /**
     * Class Article - Cette classe permet d'instancier un objet Article
     *
     * @param {string} name - la valeur de l'attribut name
     * @param {string} id - la valeur de l'attribut id
     * @param {string} lenses - la valeur de l'attribut lenses
     * @param {string} image - la valeur de l'attribut image
     * @param {number} price  - la valeur de l'attribut price
     * @param {number} quantity  - la valeur de l'attribut quantity
     */
    constructor(firstName, lastName, adress, city, email) {
      (this._firstName = firstName),
        (this.lastName = lastName),
        (this._adress = adress),
        (this._city = city),
        (this._email = email);
    }
    set firstName(firstname) {
      this._firstName = firstname;
    }
    get firstName() {
      return this._firstName;
    }
    set lastName(lastName) {
      this._lastName = lastName;
    }
    get lastName() {
      return this._lastName;
    }
    set adress(adress) {
      this._adress = adress;
    }
    get adress() {
      return this._adress;
    }
    set city(city) {
      this._city = city;
    }
    get city() {
      return this._city;
    }
    set email(email) {
      this._email = email;
    }
    get email() {
      return this._email;
    }
  }