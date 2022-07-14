import { Link, useNavigate,generatePath } from "react-router-dom";
import { useFormik } from "formik";
import { UIKIT } from "components";
import { IndexedDb } from "helpers";
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
    const indexedDb = new IndexedDb(Names.DBs.history);
    await indexedDb.createObjectStore([Names.Stores.searchedTerms]);
    await indexedDb.putValue(Names.Stores.searchedTerms, history);
  }


  return (
    <div className="gui-search">
      <div className="container">
        <img src={Logo} alt="logo" />
        <form onSubmit={formContext.handleSubmit} className="form">
          <UIKIT.InputText
            name="term"
            placeholder="Search for a user"
            value={formContext.values.term}
            onChange={formContext.handleChange}
            onBlur={formContext.handleBlur}
            errorMessage={formContext.errors.term}
          />
          <div>
            <UIKIT.Button type="submit" className="button" size="medium" label="search" />
          </div>
        </form>
        <Link to={Routes.Users.PROFILE_HISTORY}>History</Link>
      </div>
    </div>
  );
}