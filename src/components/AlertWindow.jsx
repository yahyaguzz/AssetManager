import React from 'react';
import AlertSvg from '../assets/svg/Alert';

const AlertWindow = () => {
    const alerts = [
        {
            alertCode: 3,
            alertText: "Uyarı!",
            alertDate: "10.04.2024 12:00"
        }
    ];

    return (
        <div className="h-full w-full p-2">
            <div className='p-3'>
                Bildirimler
            </div>
            <div className="h-full w-full max-h-[200px] overflow-y-auto px-5">
                {alerts.map((alert, index) => (
                    <div key={index}>
                        <div className="py-2 flex justify-between">
                            <div>
                                <AlertSvg alt="Alert" className="mr-1" color={alert.alertCode === 1 ? "#ED2F2F" : alert.alertCode === 2 ? "#FFB200" : "#34B53A"} />
                            </div>
                            <div className='text-xs mx-3'>
                                <div>
                                    {alert.alertText}
                                </div>
                                <div className="text-end text-gray-500">
                                    {alert.alertDate} {/* Using alertDate directly */}
                                </div>
                            </div>
                        </div>
                        {/* Adding horizontal line with #ADADAD color */}
                        <hr style={{ borderColor: '#ADADAD', borderWidth: '0.1px' }} />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertWindow;
