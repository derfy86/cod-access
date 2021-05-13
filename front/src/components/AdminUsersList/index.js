import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Message from 'src/containers/Message';
import CircleLoader from 'src/components/CircleLoader';
import Pagination from './Pagination';

import './styles.scss';

const AdminUsersList = ({
  fetchUsers,
  users,
  loadingUsersList,
  deleteUser,
  usersRole,
  editUserRole,
  handleChangeSelect,
  totalPages,
  displayModalConfirm,
  messageParams,
}) => {
  const query = new URLSearchParams(useLocation().search);
  const page = Number(query.get('page')) || 1;

  useEffect(() => {
    fetchUsers(page);
  }, [page, users.length]);

  if (loadingUsersList) {
    return (
      <div className="loading-centered">
        <CircleLoader
          colour="#7ED8F7"
          radius={100}
          duration={2}
          strokeWidth={20}
        />
      </div>
    );
  }

  const handleOnClickDelete = (user) => {
    displayModalConfirm({
      heading: 'Suppression utilisateur',
      message: `Souhaitez-vous réellement supprimer l'utilisateur "${user.email}"`,
      confirmParams: {
        onConfirm: () => {
          deleteUser({
            userId: user.id,
          });
        },
        params: {
          userId: user.id,
        },
        label: 'Supprimer l\'utilisateur',
      },
      cancelParams: {
        onCancel: () => { },
        label: 'Annuler',
      },
      shouldDisplayHeading: true,
      isVisible: true,
    });
  };

  const handleOnClickValidate = (idUser) => {
    editUserRole(idUser);
  };

  return (
    <>
      <div className="admin__users">
        <h1 className="title-h2">Liste des utilisateurs</h1>
        {
          messageParams.targetComponent === 'AdminUsersList'
          && (
            <Message {...messageParams} />
          )
        }
        <table className="admin__users__table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">email</th>
              <th scope="col">pseudo</th>
              <th scope="col">droit</th>
              <th scope="col">date de création</th>
              <th scope="col">dernière date de mise à jour</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.pseudo}</td>
                  <td>
                    <form className="form-responsibility">
                      <select
                        className="form-responsibility__select"
                        value={usersRole[user.id]}
                        onChange={(event) => handleChangeSelect(user.id, event.target.value)}
                      >
                        <option className="option" value="admin">Admin</option>
                        <option className="option" value="utilisateur">Utilisateur</option>
                      </select>
                      <button
                        className="button--actions valid"
                        type="button"
                        onClick={() => {
                          handleOnClickValidate(user.id);
                        }}
                      >
                        <FontAwesomeIcon size="lg" icon={faCheckCircle} />
                      </button>
                    </form>
                  </td>
                  <td>{user.created_at}</td>
                  <td>{user.updated_at}</td>
                  <td>
                    <button
                      className="button--actions"
                      type="button"
                      onClick={() => {
                        handleOnClickDelete(user);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" className=" trash" />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              activePage={page}
            />
          )
        }
      </div>
    </>
  );
};

AdminUsersList.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      pseudo: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string,
      responsibility: PropTypes.shape({
        entitled: PropTypes.string.isRequired,
      }),
    }),
  ),
  loadingUsersList: PropTypes.bool,
  deleteUser: PropTypes.func.isRequired,
  usersRole: PropTypes.object,
  editUserRole: PropTypes.func.isRequired,
  handleChangeSelect: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  messageParams: PropTypes.shape({
    targetComponent: PropTypes.string.isRequired,
  }).isRequired,
  displayModalConfirm: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

AdminUsersList.defaultProps = {
  users: [],
  loadingUsersList: false,
  usersRole: {},
};

export default AdminUsersList;
