import TextField from '@mui/material/TextField';
import { PropTypes } from 'prop-types';

const CustomTextField = ({ formik, label, id }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      id={id}
      name={id}
      value={formik?.values[id]}
      onChange={formik?.handleChange}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={formik.touched[id] && formik.errors[id]}
    />
  );
};

export default CustomTextField;

CustomTextField.propTypes = {
  formik: PropTypes.object,
  label: PropTypes.string,
  id: PropTypes.string,
};
