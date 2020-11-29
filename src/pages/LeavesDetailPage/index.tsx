import React, { useEffect } from "react";
import "./LeavesDetailPage.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlantDetails } from "../../store/plants/actions";
import { selectPlantDetails } from "../../store/plants/selectors";
import { selectUser } from "../../store/user/selectors";
import UpdateLeafForm from "../../components/UpdateLeafForm";

interface Parameters {
  id: string;
}

export default function LeavesDetailPage() {
  const params: Parameters = useParams();
  const dispatch = useDispatch();
  const plant = useSelector(selectPlantDetails);
  const user = useSelector(selectUser);

  const { id } = params;

  useEffect(() => {
    dispatch(fetchPlantDetails(parseInt(id)));
  }, [dispatch, id]);

  return (
    <div>
      <h2 className="plant-detail-page-title">Leaf details</h2>
      <div className="plant-detail-page-container">
        <div className="plant-detail-information">
          <table style={{ width: "50rem" }} className="plant-detail-table">
            <thead>
              <tr>
                <th>Leaf information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="plant-detail-column-1">Plant id</td>
                <td>{plant.id}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Name</td>
                <td>{plant.name}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Scientific name</td>
                <td>{plant.scientificName}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Description</td>
                <td>{plant.description}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Water every</td>
                <td>{plant.waterPeriodDays} days</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Water alert on</td>
                <td>{plant.waterAlert}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Fertilise every</td>
                <td>{plant.fertilisePeriodDays} days</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Fertilise alert on</td>
                <td>{plant.fertiliseAlert}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Leaf created</td>
                <td>{moment(plant.createdAt).format("DD-MM-YYYY HH:mm")}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Leaf updated</td>
                <td>{moment(plant.updatedAt).format("DD-MM-YYYY HH:mm")}</td>
              </tr>
              <tr>
                <td className="plant-detail-column-1">Owner</td>
                <td>
                  {plant.user.firstName} {plant.user.lastName}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="plant-detail-picture-container">
          <img
            className="plant-detail-picture"
            src={plant.imageUrl}
            alt="plant detail pic"
          />
        </div>
      </div>
      {user.id === plant.user.id ? <UpdateLeafForm /> : undefined}
    </div>
  );
}
