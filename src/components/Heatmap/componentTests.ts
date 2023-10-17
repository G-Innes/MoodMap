import Swal from 'sweetalert2'

const isMoodNoteValid = (note: string, showAlerts = true): boolean => {
    if (note.trim() === '') {
        if (showAlerts){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mood note cannot be empty!',
      });
    }
      return false;
    }
    if (note.length > 40) {
        if (showAlerts){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mood note should not exceed 40 characters!',
      });
    }
      return false;
    }
    return true;
  };

  export {
    isMoodNoteValid
  }