function loadDraftToEdit(draft) {
  // Ensure draft has the correct structure before opening modal
  const draftData = {
    personalDetails: {
      userUuid: draft.userUuid || '',
      firstName: draft.firstName || '',
      fatherName: draft.fatherName || '',
      email: draft.email || '',
      mobilePhone: draft.mobilePhone || '',
      insuranceUuid: draft.insuranceUuid || ''
    },
    carRequests: draft.carRequests || [],
    step: draft.step || 1
  };

  // Log the data being passed to the modal
  console.log('Opening modal with data:', draftData);

  openModal('addClient', {
    component: 'addClient',
    props: {
      draftData: draftData
    }
  });
}