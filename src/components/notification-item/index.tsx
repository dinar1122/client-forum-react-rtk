import { Card, CardBody } from '@nextui-org/react';
import { formatToClientDate } from '../../utils/format-to-client-date';

export const NotificationItem = ({elem, Icon, message}:any) => (
    <Card key={elem.id} className="mt-3 border-l-4 border-blue-500">
        <CardBody className="flex-row justify-between p-4">
            <div className="flex items-center">
                {!elem.isRead && <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>}
                <div className="flex flex-col">
                    <div className="text-gray-800 text-lg font-semibold">{message}</div>
                    <div className="text-gray-500 text-sm">{formatToClientDate(elem.timestamp, true)}</div>
                </div>
            </div>
            <Icon className="text-3xl text-blue-500" />
        </CardBody>
    </Card>
);
