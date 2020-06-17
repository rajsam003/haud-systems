export const handleValidation = (obj) => {
    let errors = {};

    if (!obj.firstName) {
      errors.firstName = "Cannot be empty";
    }

    if (typeof obj.firstName !== "undefined") {
      if (!obj.firstName.match(/^[a-zA-Z]+$/)) {
        errors.firstName = "Invalid first name";
      }
    }

    if (!obj.lastName) {
      errors.lastName = "Cannot be empty";
    }

    if (typeof obj.lastName !== "undefined") {
      if (!obj.lastName.match(/^[a-zA-Z]+$/)) {
        errors.lastName = "Invalid last name";
      }
    }

    if (!obj.address1) {
      errors.address1 = "Cannot be empty";
    }

    if (!obj.country) {
      errors.country = "Cannot be empty";
    }

    if (typeof obj.country !== "undefined") {
      if (!obj.country.match(/^[a-zA-Z]+$/)) {
        errors.country = "Invalid country name";
      }
    }

    if (typeof obj.town !== "undefined") {
      if (!obj.town.match(/^[a-zA-Z]+$/)) {
        errors.town = "Invalid town name";
      }
    }

    if (typeof obj.region !== "undefined") {
      if (!obj.region.match(/^[a-zA-Z]+$/)) {
        errors.region = "Invalid region name";
      }
    }

    if (!obj.postCode) {
      errors.postCode = "Cannot be empty";
    }

    if (typeof obj.postCode !== "undefined") {
      if (!obj.postCode.match(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9 _]+$/)) {
        errors.postCode = "Invalid Postcode";
      }
    }

    if (!obj.contactNumber) {
      errors.contactNumber = "Cannot be empty";
    }

    if (typeof obj.contactNumber !== "undefined") {
      if (!obj.contactNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)) {
        errors.contactNumber = "Invalid contact number";
      }
    }
    return errors;
  }
