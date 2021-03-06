import moment from "moment";
import { Col } from "react-bootstrap";
import styles from "./ItemHours.module.css";

export default function ItemHour(props) {
  const getDateWithTimeReset = (date) => new Date(date).setHours(0, 0, 0, 0);
  const getDateNow = () => new Date(Date.now());

  const isYesterday = () => {
    const selectedDate = getDateWithTimeReset(props.selectedDate);
    return selectedDate < getDateNow().setHours(0, 0, 0, 0);
  };

  const havePastTheCurrentTime = (hour) => {
    return (
      getDateNow().setHours(
        parseInt(hour.split(":")[0]),
        parseInt(hour.split(":")[1]),
        parseInt(hour.split(":")[2])
      ) < getDateNow() &&
      getDateWithTimeReset(props.selectedDate) ===
        getDateNow().setHours(0, 0, 0, 0)
    );
  };

  return (
    <>
      {props.list.map((hour, index) => (
        <Col
          key={index}
          className={` ${
            isYesterday() || havePastTheCurrentTime(hour)
              ? styles.disabled
              : null
          }`}
          onClick={() =>
            props.handleSelectHour(`${props.premiereId}${index}`, hour)
          }
        >
          <div
            className={`${styles.hour} ${
              props.selectedHour === `${props.premiereId}${index}` &&
              styles.selected
            }`}
            onClick={() =>
              props.handleSelectHour(`${props.premiereId}${index}`, hour)
            }
          >
            <span
              className="p-0"
              onClick={() =>
                props.handleSelectHour(`${props.premiereId}${index}`, hour)
              }
            >
              {moment(`2021-12-12 ${hour}`).format("LT").toLowerCase()}
            </span>
          </div>
        </Col>
      ))}
    </>
  );
}
