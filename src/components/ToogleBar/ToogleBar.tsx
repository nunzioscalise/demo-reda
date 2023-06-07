import { FC, useEffect, useState } from "react";

import './ToogleBar.css';

interface Props {
    data: any[];
    handleClick: (user: any) => void;
}

const ToogleBar: FC<Props> = ({ data, handleClick }) => {
    const [matrix, setMatrix] = useState<any[]>([]);

    useEffect(() => {
        algorithm();

        function algorithm() {
            let itemForRow = 0;
            for (let i = 5; i > 0; i--) {
                const remainder = data.length % i;
                const _remainder = data.length % i - 1;
                if (remainder === 0) {
                    itemForRow = i;
                    break;
                } else if (remainder > 0 && _remainder > 0 && remainder > _remainder) {
                    itemForRow = i;
                    break;
                } else if (_remainder < 0) {
                    itemForRow = i;
                    break;
                }
            }

            function sliceIntoChunks(arr: any[], chunkSize: number) {
                const res = [];
                for (let i = 0; i < arr.length; i += chunkSize) {
                    const chunk = arr.slice(i, i + chunkSize);
                    res.push(chunk);
                }
                return res;
            }
            const matrix = sliceIntoChunks(data, itemForRow);
            setMatrix(matrix);
        };

    }, [data]);

    return (
        <div className="toogle-bar">
            {
                matrix.map((userList, i) =>
                    <div key={i} className="toogle-row">
                        {
                            userList.map((user: any, ii: number) => 
                            <div key={ii} className="toogle-btn" onClick={() => handleClick(user)}>
                                {user.first_name} {user.last_name}
                            </div>)
                        }

                    </div>

                )
            }
        </div>
    )
};

export default ToogleBar;