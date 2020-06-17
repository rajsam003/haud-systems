export const handleValidation = (obj) => {
    let errors = {};

    if (obj.firstName === "") {
      errors.firstName = "Empty first name";
  }else if (typeof obj.firstName !== "undefined") {
      if (!obj.firstName.match(/^[a-zA-Z _]+$/)) {
        errors.firstName = "Invalid first name";
      }
    }

    if (obj.lastName === "") {
      errors.lastName = "Empty last name";
  }else if (typeof obj.lastName !== "undefined") {
      if (!obj.lastName.match(/^[a-zA-Z _]+$/)) {
        errors.lastName = "Invalid last name";
      }
    }

    if (obj.address1 === "") {
        errors.address1 = "Empty address";
    }

    if (obj.country === "") {
      errors.country = "Empty country";
  }else if (typeof obj.country !== "undefined") {
      if (!obj.country.match(/^[a-zA-Z _]+$/)) {
        errors.country = "Invalid country name";
      }
    }

    if (obj.postCode === "") {
      errors.postCode = "Empty post code";
  }else if (typeof obj.postCode !== "undefined") {
      if (!obj.postCode.match(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9 _]+$/)) {
        errors.postCode = "Invalid Postcode";
      }
    }

    if (obj.contactNumber === "") {
      errors.contactNumber = "Empty contact number";
  }else if (typeof obj.contactNumber !== "undefined") {
      if (!obj.contactNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)) {
        errors.contactNumber = "Invalid contact number";
      }
    }
    return errors;
  }
