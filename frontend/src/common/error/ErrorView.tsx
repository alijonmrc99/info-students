import { Button } from "antd";
import { FC } from "react";

export const ErrorView: FC = () => {
    return (
        <div className="board">
            <h1>Something went wrong</h1>
            <div>Please notify the developers about this issue and when it happened.</div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button color="default" onClick={() => window.location.reload()}>Refresh page</Button>
                <Button type="primary" onClick={() => window.location.href = '/'}>Home</Button>
            </div>
        </div>
    )
}