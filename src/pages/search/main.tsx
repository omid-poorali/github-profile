import { Link, useNavigate, generatePath } from "react-router-dom";
import { useFormik } from "formik";
import { UIKIT } from "components";
import IndexedDB from "helpers/idb";
import Logo from "assets/logo.svg";
import * as Model from "models";
import * as Names from "names";
import * as Routes from "routes";
import * as Utils from "utils";
import * as APIs from "apis";
import * as Yup from "yup";

export const Search = () => {

  const navigate = useNavigate();

  const formContext = useFormik({
    validationSchema: Yup.object({
      term: Yup.string().required("required")
    }),
    initialValues: {
      term: ""
    },
    onSubmit: (values) => {
      APIs.users().getUserInfo(values.term).then(user => {
        if (user) {
          addToHistory({
            id: user.id,
            term: values.term,
            searchedAt: Utils.Date.nowInSeconds()
          });
          navigate(generatePath(Routes.Users.PROFILE, { username: values.term }));
        }
      }).catch(err => console.log(err));
    }
  });

  const addToHistory = async (history: Model.History) => {
    const indexedDB = IndexedDB(Names.DBs.history, [Names.Stores.searchedTerms]);
    await indexedDB.putValue(Names.Stores.searchedTerms, history);
  }

  const classes = {
    root: "search-page",
    container: "search-page-container",
    form: "search-page-form",
    button: "search-page-button"
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img src={Logo} alt="logo" />
        <form onSubmit={formContext.handleSubmit} className={classes.form}>
          <UIKIT.InputText
            name="term"
            placeholder="Search for a user"
            value={formContext.values.term}
            onChange={formContext.handleChange}
            onBlur={formContext.handleBlur}
            errorMessage={formContext.errors.term}
          />
          <div>
            <UIKIT.Button type="submit" className={classes.button} size="medium" label="search" />
          </div>
        </form>
        <Link to={Routes.Users.PROFILE_HISTORY}>History</Link>
      </div>
    </div>
  );
}