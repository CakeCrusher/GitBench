export const scanForPeripherals = (device, state, setState) => {
  console.log('!scanForPeripherals', device);
  if (!state.find(item => item.id === device.id)) {
    const newState = [...state, device];
    setState(newState);
    console.log(
      '!state',
      newState.map(item => {
        return {id: item.id, manufacturerData: item.manufacturerData};
      }),
    );
  }
};
