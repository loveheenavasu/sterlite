export const isValidDevice = (device: any): Boolean => {
  const deviceType = device?.device?.type;

  switch (deviceType) {
    case 'CUCP':
      return isValidCUCPDevice(device);
    case 'CUUP':
      return isValidCUUPDevice(device);
    case 'DU':
      return isValidDUDevice(device);
    case 'DU':
      return isValidCell(device);
    default:
      return false;
  }
};

const isValidCUCPDevice = (device: any): Boolean => {
  console.log(device, 'isValidCUCPDevice');

  const { latitude, longitude } = device?.device?.attributes;
  let isValid = true;
  if (!(latitude && longitude)) {
    isValid = false;
  }

  return isValid;
};

const isValidCUUPDevice = (device: any): Boolean => {
  console.log(device, 'isValidCUUPDevice');
  const { latitude, longitude } = device?.device?.attributes;
  let isValid = true;
  if (!(latitude && longitude)) {
    isValid = false;
  }
  return isValid;
};

const isValidDUDevice = (device: any): Boolean => {
  console.log(device, 'isValidDUDevice');
  const { duName, latitude, longitude, cells } = device?.device?.attributes;
  let isValid = true;
  if (!(duName && latitude && longitude)) {
    isValid = false;
  }
  if (Array.isArray(cells) && cells?.length > 0) {
    isValid = cells.every((cell) => isValidCell(cell));
  }

  return isValid;
};

const isValidCell = (cell: any): Boolean => {
  console.log(cell, 'isValidcellDevice');
  let isValid = true;
  const { cellName, latitude, longitude } = cell;

  if (!(cellName && latitude && longitude)) {
    isValid = false;
  }
  return isValid;
};
