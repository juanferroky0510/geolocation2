//colocamos los eventos a los botones
document.getElementById("btnConsultarCiudades").addEventListener("click", getAllCities);
//document.getElementById("btnConsultarCiudad").addEventListener("click", getOneCity);
let registrosTabla = document.getElementById("registrosCiudad");


//funcion que imprime todos los registros
function getAllCities() {
  registrosTabla.innerHTML = ''; // Limpiar la tabla antes de insertar el nuevo dato
  //imprimimos todos los datos
  axios.get('//54.204.178.33/geolocation/php/connect.php?action=getAll')
    .then(function (response) {
      let registrosArreglo = response.data;
      registrosArreglo.forEach(item => {
        registrosTabla.innerHTML +=
          '<tr>' +
          '<th scope="row">' + item.ID + '</th>' +
          '<td>' + item.Name + '</td>' +
          '<td>' + item.CountryCode + '</td>' +
          '<td>' + item.District + '</td>' +
          '<td>' + item.Population + '</td>' +
          '</tr>';
      });
    })
    .catch(function (error) {
      // manejar error
      alert(error);
    })
}

//funcion que consulta solo 1 registro
function getOneCity() {
  let idCiudad = document.getElementById("idCiudad").value;
  // Validar que el ID no esté vacío
  if (idCiudad) {
    axios.get(`//35.168.9.215/geolocation/php/connect.php?action=getOne&id=${idCiudad}`)
      .then(function (response) {
        let item = response.data;
        registrosTabla.innerHTML = ''; // Limpiar la tabla antes de insertar el nuevo dato

        // Crear una fila con los datos del estudiante
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${item.ID}</td>
                <td>${item.Name}</td>
                <td>${item.CountryCode}</td>
                <td>${item.District}</td>
                <td>${item.Population}</td>
            `;
        registrosTabla.appendChild(row);
      })
      .catch(function (error) {
        console.error('Error al consultar la API:', error);
        alert('No se encontró la ciudad con ese ID.');
      });
  } else {
    alert('Por favor ingrese un ID válido.');
  }
}