import nodemailer from 'nodemailer'
export function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}
  
export function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

export function retornar(success = false, message = "OK", data = null) {
  return {
    "success": success,
    "message": message,
    "data" : data
  }
}

export function isEmail(email) {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return regex.test(email)
}


export function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cabapp09@gmail.com',
      pass: 'tqgm wrbg ebdd pqum'
    }
  });
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}