from setuptools import setup, find_packages


setup(
    name='entrenamiento',
    version='0.0.1',
    description='Un sistema para manejar el enternamiento de arqueria',
    long_description=open('README.rst').read(-1),
    author='Tomas Zulberti',
    author_email='tzulberti@gmail.com',
    license='MIT',
    url='https://github.com/tzulberti/entrenamiento-arqueria',
    install_requires=[
        "Flask",
        "Flask-SQLAlchemy",
        "flask-bcrypt",
        "Flask-Restless",
        "Flask-WTF",
        "Flask-Script",
        "Flask-Mail",

        "alembic",
        "psycopg2",
        "Pillow",
        "requests",
        "google-api-python-client",
        "python-gflags",
    ],
    entry_points={
        'console_scripts': {
            'entrenamiento = entrenamiento.commands.main:main'
        }
    },
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    keywords='pypi flask proxy',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
    ]
)
